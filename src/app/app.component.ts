import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  newMemberName = '';
  members: string[] = [];
  numOfTeams: number | '' = '';
  errorMessage = '';
  teams: string[][] = [];

  handleChange(value: string) {
    this.newMemberName = value;
  }

  addMember() {
    if (!this.newMemberName) {
      this.errorMessage = "Name can't be empty";
      return;
    }

    this.errorMessage = '';
    this.members.push(this.newMemberName);
    this.newMemberName = '';
  }

  handleChangeTeams(value: string) {
    this.numOfTeams = Number(value);
  }

  generateTeams() {
    if (!this.numOfTeams || this.numOfTeams <= 0) {
      this.errorMessage = 'Invalid number of teams';
      return;
    }

    if (this.members.length < this.numOfTeams) {
      this.errorMessage = 'Not enough members';
      return;
    }

    const membersCopy = [...this.members];
    this.errorMessage = '';

    while (membersCopy.length) {
      for (let i = 0; i < this.numOfTeams; i++) {
        const member = membersCopy.splice(this.randomNumber(membersCopy), 1)[0];
        if (!member) break;
        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    this.numOfTeams = '';
    this.members = [];
  }

  randomNumber(array: string[]) {
    return Math.floor(Math.random() * (array.length - 1));
  }
}
