import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  handlePdf(element){

    let day = new Date().getDate();
    let monthAux = new Date().getMonth();
    let year = new Date().getFullYear();
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    let second = new Date().getSeconds();
    // console.log('pdf......');
    const input = document.getElementById(element);
    html2canvas(input).then(canvas => {
      var imgWidth = 216;  
      var imgHeight = canvas.height * imgWidth / canvas.width;  
  
      const contentDataURL = canvas.toDataURL('image/png');  
      let pdf = new jspdf('p', 'mm', 'letter'); // letter size page of PDF  
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);  
      pdf.save(`${element}.${year}${monthAux + 1}${day}${hour}${minute}${second}.pdf`); // Generated PDF
    });
  }

}
