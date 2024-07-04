// src/Database/services/ratioServices.ts

import prisma from "@src/config/prismaClient";

export class RatioService {
  public async createRatio(
    name: string,
    formula: string,
    description: string,
    type: string,
  ): Promise<{
    ratioId: number;
    ratioName: string;
    description: string;
    formula: string;
    type: string;
  }> {
    // Store the ratio in the database
    const createdRatio = await prisma.ratio.create({
      data: {
        name,
        formula,
        description: description || "",
        parameters: this.extractParameters(formula),
        type,
      },
    });

    return {
      ratioId: createdRatio.ratioId,
      ratioName: createdRatio.name,
      description: createdRatio.description,
      formula: createdRatio.formula,
      type: createdRatio.type,
    };
  }

  private extractParameters(formula: string): string[] {
    const regex = /[a-zA-Z_]+/g;
    return [...new Set(formula.match(regex))];
  }

  public async getRatioById(ratioId: number) {
    return prisma.ratio.findUnique({
      where: { ratioId },
    });
  }

  public async getRatioByName(name: string) {
    return prisma.ratio.findUnique({
      where: { name },
    });
  }

  public async getAllRatios() {
    return prisma.ratio.findMany();
  }

  public async updateRatio(
    ratioId: number,
    name: string,
    formula: string,
    description: string,
    type: string,
  ) {
    return prisma.ratio.update({
      where: { ratioId },
      data: {
        name,
        formula,
        description,
        type,
        parameters: this.extractParameters(formula),
      },
    });
  }

  public async deleteRatio(ratioId: number) {
    return prisma.ratio.delete({
      where: { ratioId },
    });
  }

}

export const ratioService = new RatioService();
