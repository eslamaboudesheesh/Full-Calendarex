import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'full-calenderTest';
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  public classnameOfButton: any;//= document.getElementsByClassName("fc-button");

  calendarPlugins = [dayGridPlugin ,listPlugin , timeGridPlugin  ]; // important!
  flage = true
  displayEvent: any;
  header =  {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth  ,dayGridWeek , dayGridDay ,listMonth  '
  }
  titleFormat = { // will produce something like "Tuesday, September 18, 2018"
 
}

  public listDate: Array<any> = [];

  constructor() {
  }
  
  ngOnInit() {
    var elements = document.getElementsByClassName('spinner')
    if (elements.length > 0) {
      elements[0].classList.remove('spinner');
    }
  }


  ngAfterViewInit() {

    this.classnameOfButton = document.getElementsByClassName("fc-button");
    console.log(this.calendarComponent);
    this.fetchbutton();
    this.exucetionWhenStart();
  }


  fetchbutton() {
    for (let index = 0; index < this.classnameOfButton.length; index++) {
      const element = this.classnameOfButton[index];
      this.wrapSelectionButton(element, this.fetchButton)
    }
  }

  /*
*** select all button to access  to the exucetion function ()
** fixed error  background when click in any button in calender 
*/

wrapSelectionButton(parent, eventHandler) {
  parent.addEventListener("click", () => { eventHandler() });
}
fetchButton = () => {
  this.exucetionWhenStart();
}



// show alert dailaog  with all event content
eventClick(model: any) {
  this.displayEvent = model.event.title;
  alert(this.displayEvent + "this your event ");


  model = {
    event: {
      id: model.event.id,
      start: model.event.start,
      end: model.event.end,
      title: model.event.title,
      allDay: model.event.allDay
      // other params
    },
    duration: {}
  }

  this.displayEvent = model;

}
/* 
------> myAllEvents return all object of full-calender  then acces  to events
------>  then loop in all events take startdate  and  enddate  and  the className used for change color 
------>fetch all element the data-attributes as same as the date of range and chang backgroun color
*/
exucetionWhenStart() {
  let myAllEvents: any = this.calendarComponent.events
  let startDate: any;
  let endDate: any;
  let eventType: string;

  for (let index = 0; index < myAllEvents.length; index++) {
    startDate = myAllEvents[index].date;
    endDate = myAllEvents[index].end;
    eventType = myAllEvents[index].className;
    let testArray: Array<any> = [];
    testArray = this.getRangData(startDate, endDate);
    for (var i = 0; i < testArray.length; i++) {
      var tdDomElement = document.querySelectorAll('[data-date="' + testArray[i] + '"]');
      if(tdDomElement[0] == undefined)
      continue;
      else{        
      if(!tdDomElement[0].classList.contains(eventType)){
        var elementClasses =  tdDomElement[0].attributes[0].nodeValue;
        tdDomElement[0].setAttribute("class",elementClasses + " " + eventType + "-color");
     
    }

      } 
    }
    this.listDate = []
  }

  //#region  
  /*
   * old version for code  to find every weak then find every day and fetch all data-date 
   * comper between every data-date and the arry return from dateofRange Function () 
  */
  //var x = document.getElementsByClassName("fc-week")
  //   for (let index = 0; index < 6; index++) {  
  // let td  =  x[index].children[0].children[0].children[0].children[0]
  //  for(let indexTr =0 ; indexTr < 7 ; indexTr++)
  //  {

  //    let trelement = td.children[indexTr].getAttribute('data-date')
  //    if (testArray.includes(trelement)){

  //       td.children[indexTr].setAttribute('class','fc-green')

  //     }else{
  //      console.log("hello no ")
  //    }
  //  }


  //}
  //#endregion
}

/*  
   * this is recursion function for looping  in data range*
 ------> first take startDate and endDate 
 ------> dateMove to change format date to  Mon Apr 01 2019 02:00:00 GMT+0200 (Eastern European Standard Time) {}
 ------>toISOString return 2011-10-05T14:48:00.000Z  .slice (0,10) return 2011-10-05
------> then push to array 
*/

getRangData(startDate, endDate): Array<any> {

  let clonedStrDate;
  var dateMove = new Date(startDate);
  if (startDate < endDate) {
    var strDate = dateMove.toISOString().slice(0, 10);
    this.listDate.push(strDate);
    dateMove.setDate(dateMove.getDate() + 1);
    clonedStrDate = dateMove.toISOString().slice(0, 10);
    this.getRangData(clonedStrDate, endDate);
  };

  return this.listDate;
}

}
