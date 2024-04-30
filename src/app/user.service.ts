import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/users';

  constructor() {}

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getUserById(id: number): Promise<User | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json();
  }

  async postUser(user: User): Promise<User> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
}
