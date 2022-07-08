const express=require('express');
const router = express.Router();

const cors=require('cors');

router.use(cors());


//send email:
router.post('/email',(req, res, next)=>{
	//console.log(req.body);
	//console.log();

	//---------------------------------------------------------------------Email to from guest:
	console.log("\nEmail:\t"+req.body["email"]);
	var nodemailer = require('nodemailer');

	var transporter = nodemailer.createTransport({
	  service: 'outlook',
	  auth: {
	    user: '************************',
	    pass: '************************'
	  }
	});

	var transporter2 = nodemailer.createTransport({
	  service: 'outlook',
	  auth: {
	    user: '************************',
	    pass: '************************'
	  }
	});

	var mailOptions = {
	  from: '************************',
	  to: '************************',
	  subject: atob(req.body["subject"]),
	  text: 'Hello Stohos President,\n\nYou have received a message from '
	  +req.body["firstname"]+" "
	  +req.body["lastname"]+"\nEmail: "
	  +req.body["email"]+""+"\n\n\""
	  +atob(req.body["body"])+"\""
	};

	var timer=0;
	if(timer==0){
		transporter.sendMail(mailOptions, function(error, info){
		  if (error) {
		    //console.log(error);
		    console.log("Error on email!")
		  }
		  else{
		  	console.log("Email to Strohos has been sent successfully!")
		  	var mailOptions2 = {
			  from: '************************',
			  to: req.body["email"],
			  subject: 'Verification',
			  text: 'Hello '+req.body["firstname"]+' '+req.body["lastname"]+',\n\nWe would like to inform you that your message towards Strohos Shooting Club, with subject \"'+atob(req.body["subject"])+'\", has been received.\nWe appreciate that you communicated with us and we will try to reply as soon as possible.'
			};
			var timer2=0;
			if(timer2==0){
				transporter2.sendMail(mailOptions2, function(error, info){
				  if (error) {
				    //console.log(error);
				    console.log("Verification error!")
				  }
				  else{
				  	console.log("Verification has been sent successfully!")
				  }
				});
			}
			timer2++;
		  }
		});
	}
	timer++;

	

	//---------------------------------------------------------------------

});

module.exports = router;
