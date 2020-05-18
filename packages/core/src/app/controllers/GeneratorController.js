import ModelService from '../services/ModelService';
import ControllerService from '../services/ControllerService';
import RouterService from '../services/RouterService';
import DatabaseService from '../services/DatabaseService';

class GeneratorController {
  async store(req, res) {
    const { title: name, properties } = req.body;

    const args = {
      name,
      model: name.toLowerCase(),
      properties,
    };

    const [model, controller, router, table] = await Promise.all([
      ModelService.run({ args }),
      ControllerService.run({ args }),
      RouterService.run({ args }),
      DatabaseService.run({ args }),
    ]);

    return res.json({ model, controller, router, table });
  }
}

export default new GeneratorController();
