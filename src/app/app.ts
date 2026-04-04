import { Component, signal } from '@angular/core';
import { Hero } from './features/hero/hero';
import { About } from './features/about/about';
import { Projects } from './features/projects/projects';
import { Experience } from './features/experience/experience';
import { Contact } from './features/contact/contact';
import { Components } from './shared/components/components';

@Component({
  selector: 'app-root',
  imports: [Hero, About, Components, Projects, Experience, Contact],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lading-portafolio');
}
