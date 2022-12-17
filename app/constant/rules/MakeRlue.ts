
export class MakeRule {
  private rule: any;
  constructor(name: string, type: string = "string") {
    this.rule = { type, message: `parameters ${name}<${type}> is not allowed` };
    return this;
  }

  get() {
    return this.rule;
  }

  required() {
    this.rule.required = true;
    return this;
  }

  len(length: number) {
    this.rule.len = length;
    return this;
  }

  range(max: number, min?: number) {
    this.rule.min = min || 1;
    this.rule.max = max;
    return this;
  }

  enum(params: Array<string | number | boolean | null | undefined>) {
    this.rule.enum = params;
    return this;
  }

  pattern(pattern: RegExp | string) {
    this.rule.pattern = pattern;
    return this;
  }
}
