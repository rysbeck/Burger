import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currency = "$"


  form = this.fb.group({
    order: ["", Validators.required],
    name: ["", Validators.required],
    phone: ["", Validators.required],
  });

  productsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getData().subscribe(data => this.productsData = data);
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({behavior: "smooth"});
    if (burger) {
      this.form.patchValue({order: burger.title + ' (' + burger.price + ' ' + this.currency + ')'});
    }
  }

  confirmOrder() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message);
            },
            error: (response) => {
              alert(response.error.message);
            },
          }
        )

      alert("Thanks for your order! We`ll contact with you!")
      this.form.reset()
    }
  }

  changeCurrency() {
    let newCurrency = "$";
    let coefficient = 1;

    if (this.currency === "$") {
      newCurrency = "₽";
      coefficient = 90.25;
    } else if (this.currency === "₽") {
      newCurrency = "BYN";
      coefficient = 0.028;
    } else if (this.currency === "BYN") {
      newCurrency = "€";
      coefficient = 0.35;
    } else if (this.currency === "€") {
      newCurrency = "¥";
      coefficient = 8.03;
    } else if (this.currency === "€") {
      newCurrency = "¥";
      coefficient = 8.03;
    } else if (this.currency === "¥") {
      newCurrency = "KGS";
      coefficient = 12.3;
    } else if (this.currency === "KGS") {
      newCurrency = "AED";
      coefficient = 0.042;
    }

    this.currency = newCurrency;

    this.productsData.forEach((item: any) => {
      item.price = +(item.basePrice * coefficient).toFixed(1);
    })
  }
}
