import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<nav><strong>Apex Asset Management</strong><span>Demo 08: Advanced Routing</span></nav><router-outlet />`,
})
export class App {}
