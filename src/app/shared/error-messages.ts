export class ErrorMessages {
  constructor() { }

  private emailRequired:string = "Please enter your email";

  private validEmail:string = "Please enter a valid email ID";

  private passwordRequired:string = "Please enter your Password";

  private validatePassword:string = "Your password must have a UPPERCASE and a special character (!§$%/=) and have a length between 8 and 18 characters";

  private confirmPasswordRequired:string = "Please re-enter your password";

  private confirmPasswordValidate:string = "Entered password doesn't match";

  private termsValidate:string = "Please Accept Our Terms & Condition";

  private userFormSubmission:string = "You have Successfully Registered, Please check your mail for Activation Link";

  private firstNameRequired:string = "Please enter your First Name";

  private lastNameRequired:string = "Please enter your Last Name";

  private firstLastNameRequired:string = "Please enter both your First and Last Name";


  //Change Password
  private changeOldPwdReq:string = "Please enter your Old Password";

  private newPwdReq:string = "Please enter your New Password";

  //Change Email
  private currentEmailReq:string = "Please enter your Current Email Id";

  private currentPwdReq:string = "Please enter your Current Password";

  private newEmailReq:string = "Please enter your New Email Password";

  //Update Profile
  private countryReq:string = "Please select your Country";

  private zipCodeReq:string = "Please enter your Zipcode";

  private cityReq:string = "Please enter your City";

  private addressReq:string = "Please enter your Address";

  private phoneCodeReq:string = "Please select your Country Code";

  private phoneReq:string = "Please enter your Phone Number";

  private phoneValid:string = "Please a valid Phone Number";

  private dobReq:string = "Please enter your Date Of Birth";

  private dobValid:string = "Your age must be greater than 18years";

  private zipCodeValid:string = "Please enter a valid Zip Code";

  private walletReq:string = "Please enter your Wallet Address";

  //Silver Verification
  private idNowRew:string = "Please enter your IDNow Number";

  private IdDocNumberReq:string = "Please enter Selected Document ID Number";

  private docExpiryDate:string = "Please enter Selected Document Expiry Date";

  private docUploadReq:string = "Please upload the Selected Document File";

  private photoUploadReq:string = "Please upload your Image";
  
  //Contact Form
  private nameReq:string = "Please enter your Name";

  private messageBodyReq:string = "Please enter your Message";

  //Ibo Purchase Form
  private shareSizeReq:string = "Please enter Number Of Shares";

  private validNumber:string = "Please enter valid value of shares";


  //Two Factor Code
  private twoFactorvalidNumber:string = "Please enter valid code";

  private twoFactorMaxLen:string = "Please enter valid code";

  //Markets
  private priceRequired:string = "Please enter your price";

  private priceValid:string = "Please enter a valid value";

  private sizeRequired:string = "Please enter your size";
}
