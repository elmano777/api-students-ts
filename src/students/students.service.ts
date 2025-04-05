import { Injectable } from '@nestjs/common';
import * as sqlite3 from 'sqlite3';
import { CreateStudentDto, UpdateStudentDto } from './dto/student';

@Injectable()
export class StudentsService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('students.sqlite', (err) => {
      if (err) {
        console.error('Could not connect to database', err);
      } else {
        this.createTable();
      }
    });
  }

  private createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        lastname TEXT NOT NULL,
        gender TEXT NOT NULL,
        age TEXT
      );
    `;

    this.db.run(query);
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  getOne(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM students WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  create(data: CreateStudentDto): Promise<number> {
    const { firstname, lastname, gender, age } = data;
    return new Promise((resolve, reject) => {
      this.db.run(
        'INSERT INTO students (firstname, lastname, gender, age) VALUES (?, ?, ?, ?)',
        [firstname, lastname, gender, age],
        function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        },
      );
    });
  }

  update(id: number, data: UpdateStudentDto): Promise<void> {
    const { firstname, lastname, gender, age } = data;
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE students SET firstname = ?, lastname = ?, gender = ?, age = ? WHERE id = ?`,
        [firstname, lastname, gender, age, id],
        (err) => {
          if (err) reject(err);
          else resolve();
        },
      );
    });
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM students WHERE id = ?`, [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
