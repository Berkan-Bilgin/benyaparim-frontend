import { Component, OnInit } from '@angular/core';
import { NorthwindService } from '../northwind.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-northwind',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './northwind.component.html',
  styleUrl: './northwind.component.css',
})
export class NorthwindComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private northwindService: NorthwindService,
    private formBuilder: FormBuilder,
  ) {}
  products: any = [];

  ngOnInit(): void {
    // this.getProducts();
    this.registerForm = this.formBuilder.group({
      Email: ['', Validators.required], // Ürün adı için zorunlu alan validator'ü
      Password: [null, [Validators.required, Validators.min(1)]],
      FirstName: [null, [Validators.required, Validators.min(1)]],
      LastName: [null, [Validators.required, Validators.min(1)]], // Fiyat için zorunlu alan ve minimum değer validator'leri
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.northwindService.registerUser(this.registerForm.value).subscribe({
        next: (product) => {
          console.log('Ürün eklendi', product);
          this.registerForm.reset(); // Reactive form için formu bu şekilde sıfırlayın
        },
        error: (error) => console.error('Bir hata oluştu', error),
      });
    }
  }

  // getProducts(): void {
  //   this.northwindService.getAllProducts().subscribe((products) => {
  //     this.products = products;
  //     console.log(this.products);
  //   });
  // }

  // addProduct(form: NgForm): void {
  //   if (form.valid) {
  //     this.northwindService.addProduct(form.value).subscribe({
  //       next: (product) => {
  //         console.log('Ürün eklendi', product);
  //         form.reset(); // Formu sıfırla
  //       },
  //       error: (error) => console.error('Bir hata oluştu', error),
  //     });
  //   }
  // }
}
