import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super();
        if (delimiter !== undefined) {
            if (delimiter.length !== 1) {
                throw new Error("Delimiter must be a single character");
            }
            this.delimiter = delimiter;
        }

    this.name = source;
    this.noComponents = source === "" ? 0 : source.split(this.delimiter).length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        const components = this.name.split(this.delimiter)
        return components.join(ESCAPE_CHARACTER);
    }

    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.noComponents; i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 17;
        for (let i = 0; i < this.noComponents; i++) {
            const comp = this.getComponent(i);
            for (let j = 0; j < comp.length; j++) {
                hash = (hash * 31 + comp.charCodeAt(j)) | 0; 
            }
        }
        return hash;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        const components = this.name.split(this.delimiter);
        return components[i];
    }

    public setComponent(i: number, c: string) {
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        const components = this.name.split(this.delimiter);
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(i: number, c: string) {
        if (i < 0 || i > this.noComponents) {
            throw new Error("Index out of bounds");
        }   
        const components = this.name.split(this.delimiter);
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
    }

    public append(c: string) {
        const components = this.name.split(this.delimiter);
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
    }

    public remove(i: number) {
        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        const components = this.name.split(this.delimiter);
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
        this.noComponents -= 1;
    }

    public concat(other: Name): void {
        const components = this.name.split(this.delimiter);
        components.push(other.asString(this.delimiter));
        this.name = components.join(this.delimiter);
        this.noComponents += other.getNoComponents();
    }

}