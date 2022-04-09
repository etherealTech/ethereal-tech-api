import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('app_configs')
export class Configs {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  key_name: string;

  @Column('text')
  encrypted_value: string;

  @Column('varchar')
  account_name: string;

  @Column('varchar')
  provider_name: string;

  @Column({
    type: 'varchar',
    length: 28,
  })
  created_uid: string;

  @Column('timestamp with time zone')
  created_at: Date;
}
