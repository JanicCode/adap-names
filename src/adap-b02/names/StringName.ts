import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        if (delimiter !== undefined) {
            if (delimiter.length !== 1) {
                throw new Error("Delimiter must be a single character");
            }
            this.delimiter = delimiter;
        }

    this.name = source;
    this.noComponents = source === "" ? 0 : source.split(this.delimiter).length;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    public asDataString(): string {
        const components = this.name.split(this.delimiter)
        return components.join(ESCAPE_CHARACTER);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.noComponents === 0;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        if (x < 0 || x >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        const components = this.name.split(this.delimiter);
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        const components = this.name.split(this.delimiter);
        components[n] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {
        if (n < 0 || n > this.noComponents) {
            throw new Error("Index out of bounds");
        }   
        const components = this.name.split(this.delimiter);
        components.splice(n, 0, c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
    }

    public append(c: string): void {
        const components = this.name.split(this.delimiter);
        components.push(c);
        this.name = components.join(this.delimiter);
        this.noComponents += 1;
    }

    public remove(n: number): void {
        if (n < 0 || n >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        const components = this.name.split(this.delimiter);
        components.splice(n, 1);
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