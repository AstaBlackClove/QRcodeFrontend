import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  private userInputSubject = new Subject<string>();

  options:any[]=[];
  selectedTitle:any;
  urlForm!: FormGroup;
  urlValue:any;
  qrCode:any;

  constructor(
    private fb: FormBuilder,
    private api: ApiServiceService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.selectedTitle = 'URL';
    this.options = [
      {name: 'URL',link: '/assets/svg/url.svg',selected: true},
      {name: 'Vcard',link: '/assets/svg/vcard.svg',selected: false},
      {name: 'Mail',link: '/assets/svg/mail.svg',selected: false},
      {name: 'Message',link: '/assets/svg/message.svg',selected: false},
      {name: 'WIFI',link: '/assets/svg/wifi.svg',selected: false},
      {name: 'Crypto',link: '/assets/svg/crypto.svg',selected: false},
      {name: 'Text',link: '/assets/svg/text.svg',selected: false},
      {name: 'Youtube',link: '/assets/svg/youtube.svg',selected: false},
      {name: 'Facebook',link: '/assets/svg/facebook.svg',selected: false},
      {name: 'LinkedIn',link: '/assets/svg/linkedIn.svg',selected: false},
      {name: 'Insta',link: '/assets/svg/insta.svg',selected: false},
      {name: 'Twitter',link: '/assets/svg/twitter.svg',selected: false},
    ]

    this.urlForm = this.fb.group({
      value:['',Validators.required]
    })

    //the below subject recive the value and add an delay time to hit the api
    this.userInputSubject.pipe(debounceTime(500)).subscribe((res) => {
      this.urlFormSubmit(res);
    })
  }


  changeDetedted(index:any,name:any){

    this.qrCode = ''
    this.selectedTitle = name;

    this.options.forEach(item => {
      if (item.name !== name) {
        item.selected = false;
      }
    });

    const selectedVale = this.options.find(item => item.name == name)

    if(selectedVale){
      selectedVale.selected = true
    }

    this.clearFiled();
  }


  //this code revice the data from the subject and trigger the api
  urlFormSubmit(data:any){
    const form = new FormData();
    form.append('value',data)
    this.api.baseQrCode(form).subscribe((res:any) => {
      this.qrCode = res.response[0].QRcode
      this.cdr.detectChanges();
    })
  }

  //the below code is to recive the event from the input an send it to the subject
  onInputChange(event: Event){
    const inputvalue = (event.target as HTMLInputElement).value;
    this.userInputSubject.next(inputvalue)
  }


  downloadImage(type:any){
    const byteChar = atob(this.qrCode.split(',')[1]);
    const byteNumber = new Array(byteChar.length);

    for(let i = 0; i < byteChar.length;i++){
      byteNumber[i] = byteChar.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumber);
    const blob = new Blob([byteArray], { type: type });

    const blobUrl = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = type;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  }

  clearFiled(){
    this.urlValue ='';
  }

}
