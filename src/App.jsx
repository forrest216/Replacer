import React, { useState, useEffect } from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import './App.css';
import swap from './images/sort.svg';

const os = window.require('os');
const fs = window.require('fs');
const { ipcRenderer } = window.require('electron');
const username = os.userInfo().username;

const colorCodes = {
	"BL:": "blue",
	"GR:": "green",
	"CY:": "cyan",
	"WR:": "yellow",
	"WH:": "white",
	"RD:": "red",
	"BK": "black"
};

const gtfo = {
	"<div>": true,
	"</div>": true,
	"<p>": true,
	"</p>": true,
	"<li>": true,
	"</li>": true,
	"var": true,
	"const": true,
	"let": true,
	"function": true,
	"if": true,
	"for": true,
	"return": true,
};

const valMessages = {
	'B': ' remind',
	'W': <strong style={{ color: 'red' }}>This input is on the naughty list. Try being more specific.</strong>,
	'C': <strong style={{ color: 'red' }}>No alpha characters or CIIDs over 8 digits allowed.</strong>,
};

const App = () => {
	// state
	const [connected, setConnected] = useState(true);
	const [validated, setValidated] = useState(false);
	const [brandId, setBrandId] = useState('');
	const [ciidInput, setCiidInput] = useState('');
	const [ciidArray, setCiidArray] = useState([]);
	const [replaceThis, setReplaceThis] = useState('');
	const [withThis, setWithThis] = useState('');
	const [del, setDel] = useState(false);
	const [deleteConfirmed, setDeleteConfirmed] = useState(false);
	const [firstOnly, setFirstOnly] = useState(false);
	const [pyLog, setPyLog] = useState([]);
	const [lastMessage, setLastMessage] = useState({ text: 'Standing by', color: "black" });
	const [validationCode, setValidationCode] = useState('');
	// const [regexMatching, setRegexMatching] = useState(false);
	// const [regexp, setRegexp] = useState(null);

	const handleSwapFields = () => {
		setReplaceThis(withThis);
		setWithThis(replaceThis);
	}

	const handleUpdateCiidInput = (e) => {
		// convert newLine characters to spaces when pasting from spreadsheet
		const formattedValue = e.target.value.replace(/\n/g, ' ');
		const ciidArray = formattedValue.split(' ');
		setCiidInput(formattedValue)
		setCiidArray(ciidArray)
	}

	const handleSubmit = () => {
		const dataPayload = {
			username,
			brandId,
			ciidArray,
			replaceThis,
			withThis,
			firstOnly
		};
		ipcRenderer.send('start_background', dataPayload);
		setLastMessage({ color: 'black', text: `Running replace operation for CIIDs: ${ciidInput}` })
	}

	useEffect(() => {
		// check connection to asset archive
		fs.access('/Volumes/Asset_Archive', (err) => {
			if (err) {
				setConnected(false);
				setLastMessage({
					text: 'Not connected to Asset Archive',
					color: 'red'
				});
			}
		});
	}, []);

	useEffect(() => {
		// Validate Inputs on change
		let validationCode = '';
		// ciid input regex: / alpha | under 7 digits | over 8 digits /
		const reg = /[a-zA-Z]|\b[0-9]{1,6}\b|[0-9]{9,}/;

		const deleteOp = del && deleteConfirmed;
		// input not on naughty list
		const replaceSafe = replaceThis.length && !gtfo[replaceThis];
		if (!validationCode && replaceThis.length > 2 && gtfo[replaceThis]) validationCode = 'R';
		const withSafe = (deleteOp || withThis.length) && !gtfo[withThis];
		if (!validationCode && withThis.length > 2 && gtfo[withThis]) validationCode = 'W';

		// ciids have no alpha characters and are no longer than 8 digits
		const ciidCheck = ciidInput.length && !reg.test(ciidInput);
		if (!validationCode && ciidInput.length && !ciidCheck) validationCode = 'C';

		if (!validationCode && replaceSafe && withSafe && ciidCheck && !brandId.length) validationCode = 'B';
		// all values pass input constraints
		const valid = brandId.length && replaceSafe && withSafe && ciidCheck;
		setValidated(valid);
		setValidationCode(validationCode);
	}, [brandId, replaceThis, withThis, ciidInput, del, deleteConfirmed, validated]);

	useEffect(() => {
		// setting up an event listener to read data that background process
		// will send via the main process after processing the data sent from visible renderer process
		ipcRenderer.on('MESSAGE_FROM_BACKGROUND_VIA_MAIN', (event, arg) => {
			let log = pyLog;
			const code = arg.substring(0, 3);
			const color = (colorCodes[code] ? colorCodes[code] : 'white')
			const trimmed = colorCodes[code] ? arg.substring(3, arg.length) : arg;
			const text = color === 'white' ? `${trimmed}` : `***** ${trimmed} *****`;
			const message = { text: text, color: color };
			log.push(message);
			setLastMessage(message);
			setPyLog(log);
		});
	}, [pyLog])

	return (
		<div className="App">
			<Header />
			<select
				className={`brand-select browser-default${validationCode === 'B' ? valMessages['B'] : ''}`}
				value={brandId}
				onChange={e => setBrandId(e.target.value)}
				id="brandId">
				<option value="">Select Brand...</option>
				<option value="GP">Gap</option>
				<option value="ON">Old Navy</option>
				<option value="BR">Banana Republic</option>
				<option value="AT">Athleta</option>
				<option value="HC">Hill City</option>
				<option value="GF">Gap Factory</option>
				<option value="BF">Banana Republic Factory</option>
			</select>

			<div id="optionsContainer" className="container">
				<div className="custom-control custom-checkbox">
					<input
						type="checkbox"
						id="replaceOne"
						className="custom-control-input"
						checked={firstOnly}
						onChange={() => setFirstOnly(!firstOnly)}></input>
					<label htmlFor="replaceOne" className="custom-control-label">Replace first instance only?</label>
				</div>
				<div className="custom-control custom-checkbox delete">
					<input
						type="checkbox"
						id="deleteOp"
						className="custom-control-input"
						checked={del}
						onChange={() => setDel(!del)}></input>
					<label htmlFor="deleteOp" className="custom-control-label">Is this a delete operation?</label>
				</div>
			</div>

			<label className="textinput-label" htmlFor="replaceThis">Replace this:{validationCode === 'R' ? valMessages['W'] : ''}</label>
			<textarea
				id="replaceThis"
				placeholder="Don't break stuff - Be specific"
				value={replaceThis}
				onChange={e => setReplaceThis(e.target.value)}
				className="text-input"
				type="textarea">
			</textarea>

			<div className="swap-container">
				<button
					className="swap-button btn btn-outline-dark"
					onClick={handleSwapFields}
					>
						<img src={swap} alt="swap" height="25px"/>
				</button>
			</div>

			<div className="withThis-group">
				<label className="textinput-label" htmlFor="withThis">With this:{validationCode === 'W' ? valMessages['W'] : ''}</label>
				<textarea
					id="withThis"
					value={withThis}
					onChange={e => setWithThis(e.target.value)}
					className="text-input"
					type="textarea">
				</textarea>
				<div
					className="custom-control custom-checkbox delete-confirm"
					style={{ visibility: del ? 'visible' : 'hidden' }}
				>
					<input
						type="checkbox"
						id="deleteConfirm"
						className="custom-control-input"
						checked={deleteConfirmed}
						onChange={() => setDeleteConfirmed(!deleteConfirmed)}></input>
					<label htmlFor="deleteConfirm" className="custom-control-label">Confirm this is a delete operation</label>
				</div>
			</div>

			<label className="textinput-label" htmlFor="ciidInput">CIIDs to modify:{validationCode === 'C' ? valMessages['C'] : ''}</label>
			<textarea
				id="ciidInput"
				placeholder="No alpha characters, CIIDs must be 7 or 8 digits"
				value={ciidInput}
				onChange={handleUpdateCiidInput}
				className="text-input"
				type="textarea">
			</textarea>
			<div className="button-container">
				<button
					type="button"
					className={`btn btn-outline-${validated ? 'success' : 'danger'}`}
					disabled={!validated}
					onClick={handleSubmit}
				>{validated ? 'Run Replacement' : 'Awaiting valid input'}
				</button>
				<button
					type="button"
					className="btn btn-outline-dark"
					onClick={() => ipcRenderer.send('show-log', pyLog)}
				>Show log
				</button>
			</div>
			<div className="status">
				<h4 style={{ color: lastMessage.color }}>Status: {lastMessage.text}</h4>
				<button
					className="reconnect btn btn-outline-primary"
					style={{ display: (connected ? 'none' : 'block') }}
					onClick={() => { setConnected(true); setLastMessage({ text: 'Standing by', color: 'black' }) }}
				>Refresh</button>
			</div>
			<Footer />
		</div>
	);
}

export default App;