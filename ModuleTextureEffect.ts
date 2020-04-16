import { TextureEffect } from "./TextureEffect";

export class ModuleTextureEffect {
  private _effect: TextureEffect;
  private _DOMContainer: HTMLElement = document.querySelector(
    ".pixi-container"
  );

  public build(): void {
    console.log("building in module");
    this._effect = new TextureEffect(this._DOMContainer);
  }

  public awake(): void {}

  protected sleep(): void {}
}
