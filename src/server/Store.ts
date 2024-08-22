import * as fs from 'fs';
import * as path from 'path';

export class SimpleElectronStore {
  private data: Record<string, any>;
  private filePath: string;

  constructor(fileName: string = './store/store.json') {
    const userDataPath = path.resolve('.'); // or app.getPath('userData')
    this.filePath = path.join(userDataPath, fileName);

    try {
      // Try to read the file and parse it as JSON
      this.data = JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
    } catch (error) {
      // If file read or parse fails, start with an empty object
      this.data = {};
    }
  }

  // Get a value from the store
  get(key: string): any {
    return this.data[key];
  }

  // Set a value in the store
  set(key: string, value: any): void {
    this.data[key] = value;
    console.log(key, value);
    this.save();
  }

  // Delete a value from the store
  delete(key: string): void {
    delete this.data[key];
    this.save();
  }

  // Save the current state to disk
  private save(): void {
    console.log('Saving', this.filePath, this.data)
    fs.writeFileSync(this.filePath, JSON.stringify(this.data));
  }
}