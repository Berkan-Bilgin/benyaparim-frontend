import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    roleId: [1, Validators.required],
  });
  isSubmitted = false;
  roles = [
    { id: 1, title: 'developer' },
    { id: 2, title: 'qa' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm.get('roleId')?.valueChanges.subscribe((roleId) => {
      console.log('SEND API REQUEST AND UPDATE ROLE', roleId);
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      let errorMessage =
        'Form geçersiz. Lütfen hataları düzeltin ve tekrar deneyin.\n';

      // Kullanıcı adı için hata kontrolü
      if (this.registerForm.get('username')?.errors) {
        if (this.registerForm.get('username')?.hasError('required')) {
          errorMessage += '- Kullanıcı adı alanı zorunludur.\n';
        }
      }
      // Email için hata kontrolü
      if (this.registerForm.get('email')?.errors) {
        if (this.registerForm.get('email')?.hasError('required')) {
          errorMessage += '- Email alanı zorunludur.\n';
        }
        if (this.registerForm.get('email')?.hasError('email')) {
          errorMessage += '- Lütfen geçerli bir email adresi giriniz.\n';
        }
      }

      // Şifre için hata kontrolü
      if (this.registerForm.get('password')?.errors) {
        if (this.registerForm.get('password')?.hasError('required')) {
          errorMessage += '- Şifre alanı zorunludur.\n';
        }
        // Doğru hata anahtarını kullanarak kontrol et
        if (this.registerForm.get('password')?.hasError('minlength')) {
          errorMessage += '- Şifre en az 6 karakter uzunluğunda olmalıdır.\n';
        }
      }

      // Hata mesajını göster
      alert(errorMessage);
      return;
    }

    console.log(
      'submitted form',
      this.registerForm.value,
      this.registerForm.invalid,
    );

    this.isSubmitted = true;
  }
}
