import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super();
        if (delimiter !== undefined) {
            if (delimiter.length !== 1) {
                throw new Error("Delimiter must be a single character");
            }
        this.delimiter = delimiter;
    }

    this.components = [...source]; 
    }

    public clone(): Name {
        return new StringArrayName([...this.components], this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(ESCAPE_CHARACTER);
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }

        for (let i = 0; i < this.components.length; i++) {
            if (this.components[i] !== other.getComponent(i)) {
                return false;
            }
        }

        return true;
    }

    public getHashCode(): number {
        let hash = 17;

        for (const comp of this.components) {
            for (let i = 0; i < comp.length; i++) {
                hash = (hash * 31 + comp.charCodeAt(i)) | 0;  // 32-bit
            }
        }

        return hash;
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
        this.components.push(c);
    }

    public remove(i: number) {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }
}