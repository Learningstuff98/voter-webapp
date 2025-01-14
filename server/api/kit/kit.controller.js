'use strict';

import {Kit, Address} from '../../models';

export async function index(req, res, next) {
  try {
    const kits = await Kit.findAll({
      where: {
        user: req.user.id
      }
    });

    return res.status(200).json({data: kits});
  } catch(e) {
    return next(e);
  }
}

export async function create(req, res, next) {
  try {
    const userId = req.user.id;
    const {shippingAddress: shippingAddressBody} = req.body;
    const shippingAddress = await Address.create(shippingAddressBody);
    const kit = await Kit.create({
      shippingAddress: shippingAddress.id,
      user: userId
    });
    return res.status(200).json({data: kit});
  } catch(e) {
    return next(e);
  }
}

export async function show(req, res, next) {
  try {
    const {kitId} = req.params;
    const kit = await Kit.findOne({
      where: {
        id: kitId

      }
    });

    if (!kit) return res.status(403).end();
    kit.user = await kit.getUser();
    kit.shippingAddress = await kit.getShippingAddress();

    if (!kit.user.id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).end();
    }
    return res.status(200).json({data: kit});
  } catch(e) {
    return next(e);
  }
}


export async function patch(req, res, next) {
  try {
    const {code} = req.body;
    const {kitId} = req.params;
    const kit = await Kit.findOne({
      where: {
        id: kitId
      }
    });
    if (!kit) return res.status(403).end();
    kit.update({
      code: code && code.length ? code : null
    });
    kit.user = await kit.getUser();
    kit.shippingAddress = await kit.getShippingAddress();
    return res.status(200).json({data: kit});
  } catch(e) {
    return next(e);
  }
}
