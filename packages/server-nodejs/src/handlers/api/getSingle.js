import forEach from 'lodash/forEach';

import { db } from 'database';
import { response } from 'utils/http';
import * as customHanlders from 'handlers/custom';

export default function getSingle(req, res) {
  try {
    const { resourceConfig } = req;

    if (resourceConfig.type === 'custom') {
      return customHanlders[resourceConfig.type](req, res);
    }

    const collName = `_${resourceConfig.name}`;

    const doc = db(collName).findOne({ _id: req.params.id });
    if (!doc) return response.notFound(res);

    // Process relationship configs
    const { schema } = resourceConfig;

    forEach(schema, (val, key) => {
      if (val.relationship && Object.keys(val.relationship).length > 0) {
        let docs = [];

        const query = {};
        query[val.relationship.selector] = req.params.id;
        docs = db(`_${key}`).find(query);
        doc[key] = docs || [];
      }
    });

    return response.ok(res, doc);
  } catch (err) {
    return response.internalError(res);
  }
}
