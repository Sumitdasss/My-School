/* eslint-disable @typescript-eslint/no-require-imports */
// scripts/createAdmin.js
import bcrypt from "bcrypt";
import {db} from '../db/index.js';
import { Admin } from '../db/schema.js';

async function createAdmin() {
  const hashedPassword = await bcrypt.hash('01880851638 Sumitdas', 10);
  
  await db.insert(Admin).values({
    username: 'Sumit Das',
    email: 'nodidas4612@gmail.com',
    password: hashedPassword,
    fullName: 'Sumit Das11',
    role: 'super_admin',
  });
  
  console.log('✅ Super Admin তৈরি হয়েছে!');
}

createAdmin();