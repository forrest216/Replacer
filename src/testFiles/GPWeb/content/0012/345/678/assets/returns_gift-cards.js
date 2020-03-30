
var subDirContentData  = {
	"subDirContentDataInfo": [
		// Top section - question header and description
		{
			"type":"top",
			"infoDet": [{
				"topBody":[{
					"bodyTitle":"Returning a Gift Card",
					"bodyDesc":"<p>You can return unused traditional gift cards for free. We refund the amount to the original form of payment, such as the credit card used for the order. If the gift card was a gift to you, see \"<a href='/customerService/info.do?cid=81264&cs=gifts' onclick='return contentItemLink(this)'>Returning or exchanging a gift<\/a>.\"</p><p>Electronic gift cards can be canceled before the date of delivery, but they cannot be canceled or returned after that date.</p><p>To cancel an order in advance for a traditional gift card, see \"<a href='/customerService/info.do?cid=81266&cs=change_or_cancel' onclick='return contentItemLink(this)'>Changing or canceling your order<\/a>.\"</p>"
				}]	
			}]
		},
		// Body - includes 
		{
			"type":"sub",
			"infoDet": 
			[
			// Returning a gift card sub-topic 1 - To return a traditional gift card
			{
				"addStyle": "",
				"subBody": [{
					"topicBanner": [{
						"icon": [{
							"iconClass":"plus",
							"iconUrl":""
						}],
						"title":"To return a traditional gift card",
						"titleLink":"csContentHelpers.expandContent()"
					}],
					"topicDesc":"",
					"topicBody":[{
						"bodyDetail":[
							{
								"detailIcon":[{
									"detailIconClass":"",
									"detailIconUrl":""
								}],//end detailIcon
								"detailHead":"",
								"detailDesc":"" + 
									"<div class='grid-root'>" + 
										"<div class='g-lg-12-24 g-sm-1-1 g-1-1'>" + 
											"<p><strong>To return a gift card by mail:</strong></p>" + 
											"<p>Follow the directions given in \"<a href='/customerService/info.do?cid=81264&cs=items_bought_online' onclick='return contentItemLink(this)'>To return items by mail<\/a>.\" Only gift cards purchased online can be returned by mail.</p>" + 
										"</div>" + 
										"<div class='g-lg-12-24 g-sm-1-1 g-1-1'>" + 
											"<p><strong>To return a gift card in a store:</strong></p>" + 
											"<p>Take the gift card and invoice or receipt to the appropriate store (for example, a Gap gift card to a Gap store) and tell a sales associate that you want to make a return.</p>" + 
										"</div>" + 
									"</div>" + 
									"<p style='clear:both; padding-top:14px; border-top:1px #ccc solid'><strong>If you don't have an invoice</strong>,please <a href=\"http://www.gap.com/customerService/info.do?cid=81270&cs=email_call_write\" style='text-decoration:underline;'>Contact Us</a> for help in completing this return.</p>"
							}
						],  // end bodyDetail
						// start of the addDetail
						"bodyAddDetail":[{
							"addDetailIcon":[{
								"addDetailIconClass":"step_next",
								"addDetailIconUrl":""
							}],//end addDetail asset
							"addDetailHead":"What happens next?",
							"addDetailDesc":"<p>We refund the full amount of the gift card to the original form of payment (such as the credit card used for the order) as soon as we receive the delivery.<\/p><p>If the refund is applied to your credit card, your credit card company may take up to 10 additional business days to post the refund to your account.<\/p>"
						}]// end bodyAddDetail
					}] //end topicBody
				}]// end subBody  			
			},
			// Returning gifts sub-topic 2 - To cancel an electronic gift card
			{
				"addStyle": "",
				"subBody": [{
					"topicBanner": [{
						"icon": [{
							"iconClass":"plus",
							"iconUrl":""
						}],
						"title":"To cancel an electronic gift card",
						"titleLink":"csContentHelpers.expandContent()"
					}],
					"topicDesc":"",
					"topicBody":[{
						"bodyDetail":[
							{
								"detailIcon":[{
									"detailIconClass":"",
									"detailIconUrl":""
								}],//end detailIcon
								"detailHead":"",
								"detailDesc":"<p>If the delivery date is still in the future, call CashStar customer support at <a href=\"tel:18668539918\">866-853-9918</a> to cancel your purchase.<\/p><p>If the delivery date is today or in the past, the purchase can't be canceled or returned.<\/p>"
							}
						],  // end bodyDetail
						// start of the addDetail
						"bodyAddDetail":[]
						// end bodyAddDetail
					}] //end topicBody
				}]// end subBody  			
			}		
			]
		}
	],
	// Related topics
	"topicRelatedTopics": [
		{
			"title":"Buying a gift card",
			"link":"/customerService/info.do?cid=81265&cs=buy_gift_cards"
		},
		{
			"title":"Changing or canceling your order",
			"link":"/customerService/info.do?cid=81266&cs=change_or_cancel"
		},
		{
			"title":"International returns and exchanges",
			"link":"/customerService/info.do?cid=81267&cs=returns_and_exchanges"
		}
	]
}
