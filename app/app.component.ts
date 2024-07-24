import { Component } from '@angular/core';

import {Services} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stohos';
  buttons:string[] = ["Home", "AboutUs", "Gallery", "ClubRules", "ContactUs"];
  displayPannel(cpannelName:string,navbarComponent:string){
  	let pannel = document.getElementById(cpannelName);
  	let button = document.getElementById(navbarComponent);
  	if(pannel && button){
  		for(let i=0; i < this.buttons.length; i++){
  			if(document.getElementById(this.buttons[i]).classList.value.includes("navitemActivated")){
  				document.getElementById(this.buttons[i]).classList.remove("navitemActivated");
  				let name:string=  this.buttons[i];
  				name = name.charAt(0).toLowerCase() + name.slice(1);
  				document.getElementById(name).style.display="none";
  			}
  		}
  		if(pannel.style.display=="block"){
  			pannel.style.display="none";
  			button.classList.remove('navitemActivated');
  		}
  		else{
  			pannel.style.display="block";
  			button.classList.add('navitemActivated');
  		}
  	}
  }

  //Contact Us:
  firstname:string="";
  lastname:string="";
  email:string="";
  emailSubject:string="";
  emailBody:string="";

  constructor(private services : Services) { }

  sendMessage(){
    this.services.postEmail(this.firstname, this.lastname, this.email, this.emailSubject, this.emailBody);
    this.emailBody="";
    this.emailSubject="";
  }
  clearEmailBody(){
  	this.emailBody="";
  }

  //Club Rules:
  ruleDiv=0;
  ruleSet:string[]=[
  "Always keep firearms pointed in a safe direction",
  "Always keep your finger off the trigger until ready to shoot",
  "Always keep your gun unloaded until you are at the firing line and the range is declared \"HOT.\" Firearms must be safe (unloaded - magazines removed and actions opened) when entering or exiting the range.",
  "Cease Firing: Immediately stop shooting when anyone calls \"Cease firing.\"",
  "COLD Range: Shooters must check with others to ensure firearms are unloaded, actions open and firearms laid down on the shooting bench before going down range. No one is permitted to handle firearms or stand at the firing line while there is a cold range.",
  "HOT Range: Shooters must check with others to ensure there is no one down range; when the range is declared \"HOT\" shooters are permitted to commence firing. Only shooters are permitted on the firing line. Shooters may move safe guns to and from the firing line only when the range is \"HOT.\"",
  "All shooters are responsible for their rounds staying within the confines of this range. Shooters may shoot only from the firing line at the target in line with their position. Shooting at items placed on the ground or at targets not posted at the appropriate height on the target frame enables rounds to escape the range.",
  "Respect the Range: Please place your trash into the trash receptacles and your spent brass into the recycling receptacles. Tracer, armor piercing and incendiary ammunition is prohibited. When going downrange, stay on the walkways to and from the targets-access to the backstop and all areas outside of the target lines and walkways is prohibited.",
  "Respect Yourself: Wear eye and ear protection. Food, beverages and smoking are not allowed on the firing line. You should wash your hands and face after shooting.",
  "Respect Others: There is a one-hour time limit for use of the range if patrons are waiting."
  ];
  changePage(sign:string){
  	if(sign=="-"){
  		this.ruleDiv=this.ruleDiv-6;
  	}
  	else{
  		this.ruleDiv=this.ruleDiv+6;
  	}
  }

  //Gallery:
  galleryList:string[]=[];
  currentImage:string="";
  getDescription(){
  	var xmlHttp = new XMLHttpRequest();
    let apiKey = 'your_api_key';
  	xmlHttp.open( "GET", "http://localhost:8800/gallery", false ); // false for synchronous request
  	xmlHttp.send( null );
  	this.galleryList=JSON.parse(xmlHttp.responseText);
  	this.currentImage="./assets/shootingRange/"+this.galleryList[0];
  }
  changeImageClick(name:string){
  	this.currentImage="./assets/shootingRange/"+name;
  	for(let i=0; i<this.galleryList.length;i++){
  		if(document.getElementById(this.galleryList[i]).classList.value.includes("galleryItemActivated")){
  			document.getElementById(this.galleryList[i]).classList.remove("galleryItemActivated");
  		}
  	}
  	document.getElementById(name).classList.add("galleryItemActivated");
    if(document.getElementById(name).offsetTop < (document.getElementById("gallery").offsetTop +5) || document.getElementById(name).offsetTop > (document.getElementById("gallery").offsetTop +450)){
  	 document.getElementById(name).scrollIntoView();
    }
  }
  galleryArrow(sign:string){
  	if(sign=="+"){
  		if((this.galleryList.indexOf(this.currentImage.substr(this.currentImage.lastIndexOf('/') + 1))+1)<this.galleryList.length){
  			this.changeImageClick(this.galleryList[this.galleryList.indexOf(this.currentImage.substr(this.currentImage.lastIndexOf('/') + 1))+1]);
  		}
  		else{
  			this.changeImageClick(this.galleryList[0]);
  		}
  	}
  	if(sign=="-"){
  		if((this.galleryList.indexOf(this.currentImage.substr(this.currentImage.lastIndexOf('/') + 1))-1)>=0){
  			this.changeImageClick(this.galleryList[this.galleryList.indexOf(this.currentImage.substr(this.currentImage.lastIndexOf('/') + 1))-1]);
  		}
  		else{
  			this.changeImageClick(this.galleryList[this.galleryList.length-1]);
  		}
  	}
  }
  //About Us:
  aboutUsArray={
    "Our Past" : "Our club was established in the year 1922, by a group of shooters. The club was slow to start and until the 1950s did not manage to aquire a large number of members. It reached its popularity's peak in the 1980s, when the grounds where upgraded and they became a large Skeet Range." ,
    "Our Present" : "These days, in our struggle to become better, we face the chalenge of finding a new identity. Are we a club of old-fashioned individuals who find pleasure in shooting guns? Are we a club which teaches the art of using tools of death? Many are those who are quick to accuse us with such words. We are the ones who control the passion of shooting, the sportsmen, the athletes.We strive for a better tomorrow, by finding ways to control and educate our members. We are the responsible gun owning and gun using club. We are Stohos!",
    "Our Future" : "Priorities are the rules that create our ethos. Our greatest priority is our children. Together we teach our younglings how to be responsible and safe. We want to preserve our tradition of shooting for sport  and hunting. We do so responsibly. After all our youngest members will carry on this task when they will have become the eldest. We honor this circle of life, by giving to our next generation the best we can afford.",
    "Our Ethics" : "1)Never point a gun towards a person.<br>2)Always follow the safety regulations of the club.<br>3)No member is left alone. Please reach to us even for non-club-related matters.<br>4)Be kind, even to those who do not understand our creed. Make friends, not enemies.",
    "Gun Control" : "We do not accept new members who are not willing to provide mental health examinations along with their applications. We only accept new members who are willing to produce evidence of safe weapon keeping at home. We do not accept new members who have ever had violence related incidents. Weapons are tools, initially created to take lives. Respect the power of the tool, know what it is capeable of, protect yourselvs and those of the ones around you.",
    "Dog Training" : "We offer dog training programs that require not only your dog, but also your time. Owner and dog will be trained alongside each other and learn the craft of hunting. Experience the unique relationship, between hunter and his dog.",
    "Environment" : "Our planet is changing and so must we. Join us on our effort to save the little that we can. Become a member of out forest conservation teams and our program \"Plant a Tree\"!"
  }
  aboutUsPopUp(picture,title){
    document.getElementById("popUpContainer").style.right=((screen.width-350)/2).toString();
    document.getElementById("popUpContainer").style.top="20%";
    document.getElementById("popUpTitle").innerHTML=title;
    document.getElementById("popUpPicture").style.backgroundImage="URL('"+picture+"')";
    document.getElementById("popUpText").innerHTML=this.aboutUsArray[title];
    document.getElementById("hideAboutUs").style.top="0";
  }
  aboutUsPopUpHide(){
    document.getElementById("popUpContainer").style.top="-520px";
    document.getElementById("hideAboutUs").style.top="-100%";
  }
}

