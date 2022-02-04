import { ImageSourcePropType } from 'react-native';

export class Profile {

  constructor(readonly firstName: string,
              readonly lastName: string,
              readonly photo: ImageSourcePropType,
              readonly gender: Gender,
              readonly age: number,
              readonly weight: number,
              readonly height: number,
              readonly email: string,
              readonly phoneNumber: string) {
  }

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  static jenniferGreen(): Profile {
    return new Profile(
      'Admin',
      'Admin',
      require('../assets/image-profile.jpg'),
      Gender.MALE,
      25,
      48,
      174,
      'admin@novopay.in',
      '+91 98985 98789',
    );
  }
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}
