import * as PIXI from "pixi.js";
import { Geometry } from "./Geometry";
import { FragmentSrc } from "./FragmentSrc";
import { VertexSrc } from "./VertexSrc";
export class TextureEffect {
  private _app: PIXI.Application;
  private _width: number;
  private _height: number;
  private _DOMContainer: HTMLElement;
  private _geometry: PIXI.Geometry;
  private _vSrc: string;
  private _fSrc: string;
  private _uniforms: { noise: PIXI.Texture; time: Number };
  private _shader: PIXI.Shader;
  private _quad: PIXI.Mesh;
  private _time: number = 0;

  constructor(domElement: HTMLElement) {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._DOMContainer = domElement;
    this.setupPIXIApp();
  }

  private setupPIXIApp() {
    this._app = new PIXI.Application({
      resizeTo: window,
      width: this._width,
      height: this._height,
    });
    this._DOMContainer.appendChild(this._app.view);
    this.buildGeometry();
    this.getSrcs();
    this.createUniforms();
    this.setUpShader();
    this._app.stage.addChild(this._quad);

    this._app.ticker.add((delta) => {
      this._time += 1 / 60;
      this._quad.shader.uniforms.time = this._time;
      this._quad.scale.set(
        Math.cos(this._time) * 1 + 2,
        Math.sin(this._time * 0.7) * 1 + 2
      );
    });
  }

  private buildGeometry() {
    this._geometry = new Geometry().geometry;
  }

  private getSrcs() {
    this._vSrc = new VertexSrc().getVSrc;
    this._fSrc = new FragmentSrc().getFSrc;
  }

  private createUniforms() {
    this._uniforms = {
      noise: PIXI.Texture.from("cloudTexture.jpg"),
      time: 0,
    };

    // Make sure repeat wrap is used and no mipmapping.
    this._uniforms.noise.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    this._uniforms.noise.baseTexture.mipmap = 0;
  }

  private setUpShader() {
    this._shader = PIXI.Shader.from(this._vSrc, this._fSrc, this._uniforms);
    this._quad = new PIXI.Mesh(this._geometry, this._shader);
    this._quad.position.set(400, 300);
    this._quad.scale.set(2);
  }
}
