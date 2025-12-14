import { AppDataSource } from "../config/typeorm.config.js";
import { AttributeValue } from "../entities/AttributeValue.entity.js";
import { AttributeType } from "../entities/AttributeType.entity.js";

export async function seedAttributeValues() {
  const typeRepo = AppDataSource.getRepository(AttributeType);
  const valueRepo = AppDataSource.getRepository(AttributeValue);

  const color = await typeRepo.findOneByOrFail({ name: "Color" });
  const material = await typeRepo.findOneByOrFail({ name: "Material" });

  await valueRepo.save([
    { type_id: color.id, value: "Red" },
    { type_id: color.id, value: "Blue" },
    { type_id: material.id, value: "Silk" },
    { type_id: material.id, value: "Cotton" },
  ]);
}

