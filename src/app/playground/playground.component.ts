import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

declare global {
  interface Window {
    globalAhmet: () => void;
  }
}

window.globalAhmet = function () {
  console.log('Global ahmet fonksiyonu cagirildi.');
};

@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.css',
})
export class PlaygroundComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User;
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {
    this.userForm = this.fb.group({
      id: ['', Validators.required],
      isim: ['', Validators.required],
      soyisim: ['', Validators.required],
      kullaniciAdi: ['', Validators.required],
      email: ['', Validators.required],
      sifre: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.users = await this.userService.getAllUsers();
  }

  async onSelectUser(id: number) {
    this.selectedUser = await this.userService.getUserById(id);
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService
        .postUser(this.userForm.value)
        .then(() => {
          console.log('user basarıyla gönderildi.');
        })
        .catch((error) => {
          console.error('User gönderilirken bir hata oluştu', error);
        });
    }
  }
}
