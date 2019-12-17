/**
 * Welcome to the Angular tutorial. Before starting, try to compile and serve the app, and view it into your
 * browser of choice. To do so, open a terminal into the root folder of this repository and run
 *
 *  npx ng serve
 *
 * Then navigate to {@link http://localhost:4200 } and you should see the Angular demo page.
 * I invite you to try and modify the code here and see what changes on the browser (it is updated in real time).
 * Experiment, don't be scared of messing up, Git is your friend.
 *
 * This file, as most of the other typescript file that you will see,
 * is a typescript module. The default for a javascript/typescript is 'script', that is a sequence of
 * commands that will be executed in order when the script is loaded.
 *
 * A typescript module usually consist of a list of definition, and can make use of import/export directives
 * to share definitions with other modules. The imperative code present in a module will be executed
 * when the module is first imported by another module, but it is not a good idea to rely on loading
 * to perform side effect, instead good module design expose types and constant to be used by other modules
 *
 * This file here is an exception to the rule because is the root module of the application, and it is
 * responsible of executing the side effect that result in the application being started.
 *
 * Please note that from now on although the correct wording is '(typescript) module' we will refer to
 * them as just '(typescript) files' because Angular has his own concept of "modules", and we don't want
 * to confuse the reader more than necessary. We will use "module" to refer to Angular modules
 */

/*
 These are import directives. The ones starting with '.' or '..' are relative imports, and the path must
 be interpreted as relative to the directory the current file is in, all the others are absolute imports,
 and in most projects refer to a path starting in the 'node_modules' directory.
 The syntax is self explanatory.
*/
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// This starts the Angular application, specifying that the root (angular) module is a class called AppModule.
// Not much to say here, ctrl + click on "AppModule" to navigate to its definition in the file './app/app.module.ts'
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => { console.error(err); });
