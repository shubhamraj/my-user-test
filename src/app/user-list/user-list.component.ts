import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList:any=[];
  FemaleGenderCount:any=0;
  MaleGenderCount:any=0;
  userFormData:any;
  LanguageList:any;
  selectedCheckBoxes:any;
  TotalUserCount:any;

  constructor(public userService: UserDataService) { }


  ngOnInit(): void {
    this.GetUserData();  
  }

  //Get User Data List
  GetUserData(){

    this.userService.getUserData().subscribe((data:any)=> {
      this.userList = data;
      this.GenderCounter();
    })

  }

  //Add the new user data
  onSave(){

    this.userFormData =   document.getElementById("userData");
    this.LanguageList = [];
    this.selectedCheckBoxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (var i = 0; i < this.selectedCheckBoxes.length; i++) {
      this.LanguageList.push(this.selectedCheckBoxes[i].value)
    }

    let object = {
      "Name":this.userFormData['name'].value,
      "DOB":this.userFormData['date'].value,
      "Languages": this.LanguageList,
      "Gender":this.userFormData['gender'].value,
    }

    if(object.Name != '' && object.DOB != '' && object.Languages != '' && object.Gender != ''){
    
      this.userService.addUserData(object).subscribe((data:any)=> {
        this.GetUserData();
        this.userFormData['name'].value = '';
        this.userFormData['date'].value = '';
        this.userFormData['gender'].value = '';
      })

     }else{
      alert('Please Select All Items');
    }

  }

  //Get number of count as per gender
  GenderCounter(){


    if(this.userList != null){
      let FemaleGender = this.userList.filter((user: any) => user.Gender == 'Female');
      this.FemaleGenderCount = FemaleGender.length;
      let MaleGender = this.userList.filter((user: any) => user.Gender == 'Male');
      this.MaleGenderCount = MaleGender.length;
      this.TotalUserCount =   (this.MaleGenderCount + this.FemaleGenderCount) * 10;
    }

  }



}
