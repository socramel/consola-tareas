import colors from "colors";

import {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
} from "./helpers/inquirer.js";
import Tareas from "./models/tareas.js";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";

const main = async () => {
  let opt = "";
  const tareas = new Tareas();

  const tareasDB = leerDB();

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // Imprime el menú
    opt = await inquirerMenu();

    switch (opt) {
      case "1": // Crear opción
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3": // Listar completadas
        tareas.listarPendientesCompletadas(true);
        break;

      case "4": // Listar pendientes
        tareas.listarPendientesCompletadas(false);
        break;

      case "6": // Borrar
        const id = await listadoTareasBorrar(tareas.listadoArr);
        // Preguntar si está seguro
        console.log({ id });
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");

  // pausa();
};

main();
