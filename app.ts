import { ModuleTextureEffect } from "./ModuleTextureEffect";

export class App {
  private _module: ModuleTextureEffect;

  constructor() {
    this.build();
  }

  private build() {
    window.addEventListener("load", this.awake);
    this._module = new ModuleTextureEffect();
    this._module.build();
  }

  private awake = () => {
    this._module.awake();
  };
}

let app: App = new App();
