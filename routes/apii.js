var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");


																	
router.post("/sendsms", function (req, res, next) {
  const { phone , message} = req.body;
  // console.log('otpppppppppppppppppppppppppppppppppppppppppppppppppppppppp',body.message)
	// const msg = `${message}`;
  console.log(req.body);								 
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(`http://msg.kiriinfotech.com/rest/services/sendSMS/sendGroupSms?AUTH_KEY=5075ce37642ce1da57d9667f5d18557&message=${message}&senderId=SAPPAL&routeId=8&mobileNos=${phone}&smsContentType=english`,
  requestOptions
  )

  // fetch(`http://msg.kiriinfotech.com/rest/services/sendSMS/sendGroupSms?AUTH_KEY=5075ce37642ce1da57d9667f5d18557&message=Vikram%20Test%20SMS&senderId=SAPPAL&routeId=8&mobileNos=8770206043&smsContentType=english`,
  // requestOptions
  // )

  // fetch(
  //   `http://msg.kiriinfotech.com/rest/services/sendSMS/sendGroupSms?AUTH_KEY=5075ce37642ce1da57d9667f5d18557&message=${message}&senderId=SAPPAL&routeId=8&mobileNo=${phone}&smsContentType=english&entityid=123456789012345678912&tmid=1478523690&templateid=1234567890`,
  //   requestOptions
  // )
    .then((response) => response.json())
    .then((result) => res.status(200).json({ ...result, status: true }))
    .catch((error) => res.status(200).json({ ...error, status: false }));
});

module.exports = router;
