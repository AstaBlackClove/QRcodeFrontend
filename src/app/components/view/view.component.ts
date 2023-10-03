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
  barCodeForm!: FormGroup;

  //baseUrl
  urlValue:any;

  //vCard
  firstName:any;
  lastName:any;
  mail:any;
  mobile:any;
  company:any;
  street:any;
  city:any;
  state:any;
  country:any;
  pincode:any;
  url:any;

  //Mail
  sendMail:any;
  sub:any;
  msg:any;

  //WIFI
  ssid:any;
  password:any;
  hidden:boolean = false;
  secureType:any = 'None';

  //Crypto
  amount:any;
  receiver:any;
  message:any;
  currencyType:any = 'bitcoin';


  qrCode:any = '';
  loading:boolean = false;

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
      {name: 'WIFI',link: '/assets/svg/wifi.svg',selected: false},
      {name: 'Crypto',link: '/assets/svg/crypto.svg',selected: false},
      {name: 'Text',link: '/assets/svg/text.svg',selected: false},
      // {name: 'BarCode',link: '/assets/svg/barcode.svg',selected: false},
      // {name: 'Message',link: '/assets/svg/message.svg',selected: false},
      // {name: 'Youtube',link: '/assets/svg/youtube.svg',selected: false},
      // {name: 'Facebook',link: '/assets/svg/facebook.svg',selected: false},
      // {name: 'LinkedIn',link: '/assets/svg/linkedIn.svg',selected: false},/
      // {name: 'Insta',link: '/assets/svg/insta.svg',selected: false},
      // {name: 'Twitter',link: '/assets/svg/twitter.svg',selected: false},
    ]

    this.barCodeForm = this.fb.group({
      text:['',Validators.required],
      type:['code128']
    })

    //the below subject recive the value and add an delay time to hit the api
    this.userInputSubject.pipe(debounceTime(700)).subscribe((res) => {
      this.urlFormSubmit(res);
    })
  }


  changeDetedted(index:any,name:any){

    this.qrCode = ''
    this.loading = false;
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
    this.loading = true;
    const form = new FormData();
    form.append('value',data)
    this.api.baseQrCode(form).subscribe((res:any) => {
      this.qrCode = res.response[0].QRcode
      this.cdr.detectChanges();
      this.loading = false;
    })
  }

  setHidden(value:any){
    const finalValue = value.target.checked
    this.hidden = finalValue
  }

  //vCard API
  submit(value:any){
    this.loading = true;

    if(value == 'Vcard'){
      const vCardForm = new FormData();
      vCardForm.append('firstName',this.firstName);
      vCardForm.append('lastName',this.lastName);
      vCardForm.append('mobile',this.mobile);
      vCardForm.append('mail',this.mail);
      vCardForm.append('company',this.company);
      vCardForm.append('street',this.street);
      vCardForm.append('city',this.city);
      vCardForm.append('state',this.state);
      vCardForm.append('country',this.country);
      vCardForm.append('url',this.url);
      vCardForm.append('pincode',this.pincode);

      this.api.vCard(vCardForm).subscribe((res:any) => {
        this.qrCode = res.response[0].QRcode
        this.loading = false;
      })
    }else if(value == 'Mail'){
      const mailForm = new FormData();
      mailForm.append('mail', this.sendMail);
      mailForm.append('subject', this.sub);
      mailForm.append('content', this.msg);

      this.api.mailQrCode(mailForm).subscribe((res:any) => {
        this.qrCode = res.response[0].QRcode
        this.loading = false;
      })
    }else if(value == 'WIFI'){
      const WiFiForm = new FormData();
      WiFiForm.append('ssid',this.ssid);
      WiFiForm.append('password',this.password);
      WiFiForm.append('hidden',this.hidden.toString());
      WiFiForm.append('securityType',this.secureType);

      this.api.wifiQrCode(WiFiForm).subscribe((res:any) => {
        this.qrCode = res.response[0].QRcode
        this.loading = false;
      })
    }else if(value == 'Crypto'){
      console.log({ amount:this.amount,recive:this.receiver,msg:this.message,type:this.currencyType })
      const cryptoForm = new FormData();
      cryptoForm.append('currencyType',this.currencyType);
      cryptoForm.append('amountInBTC',this.amount);
      cryptoForm.append('receiver',this.receiver);
      cryptoForm.append('message',this.message);

      this.api.cryptoQrCode(cryptoForm).subscribe((res:any) => {
        this.qrCode = res.response[0].QRcode
        this.loading = false;
      })
    }
  }

  //the below code is to recive the event from the input an send it to the subject
  onInputChange(event: Event){
    const inputvalue = (event.target as HTMLInputElement).value;
    if(inputvalue !== ''){
      this.userInputSubject.next(inputvalue)
    }else{
      this.qrCode = ''
    }
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

  clearVcard(){
    this.firstName = '';
    this.lastName = '';
    this.mobile = '';
    this.mail = '';
    this.state = '';
    this.street = '';
    this.city = '';
    this.pincode = '';
    this.url = '';
    this.company = '';
    this.country = '';
    this.qrCode = '';
  }

}
