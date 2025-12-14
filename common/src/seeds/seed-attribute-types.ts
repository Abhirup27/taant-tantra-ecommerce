import { AppDataSource } from "../config/typeorm.config.js";
import { AttributeType } from "../entities/AttributeType.entity.js";

export async function seedAttributeTypes() {
  const repo = AppDataSource.getRepository(AttributeType);

  await repo.save([
    { name: "Color" },
    { name: "Material" },
    { name: "Length" },
  ]);
}

