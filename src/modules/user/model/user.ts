
import { Entity, Column, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 150 })
  question: string;

  @Column({ length: 150 })
  answer: string;

  @Column({ default: true })
  isActive: boolean;


  @Column({ default: false })
  isVerified: boolean;


  @Column({
    default:()=>'CURRENT_TIMESTAMP'
  })
  createdDate :Date;

  @Column({ length: 6 })
  lastActiveOtp: string;
}
