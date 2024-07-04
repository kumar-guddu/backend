import prisma from "@src/config/prismaClient";
import { Watchlist } from "@prisma/client";

type watchlistResponse = {
  id: number;
  user: string;
  name: string;
  companies: string[];
}

type watchlistPreviewResponse = {
  watchLists: watchlistResponse[];


}


export class WatchlistService {
  /**
   * Create a new watchlist for a user.
   * @param userId - The ID of the user.
   * @param name - The name of the watchlist.
   * @param companies - Array of company symbols 
   * to be included in the watchlist.
   * @returns The created watchlist.
   */
  public async createWatchlist(
    userId: number, 
    name: string, companies: string[]): Promise<watchlistResponse> {
    if (!companies) {
      throw new Error("Companies array is required.");
    }

    const watchlist = await prisma.watchlist.create({
      data: {
        name,
        userId,
        companies: {
          create: companies.map(symbol => ({
            symbol,
          })),
        },
      },
      include: {
        companies: true,
        user: true, // Include user to get the email

      },
    });

    return {
      id: watchlist.id,
      user: watchlist.user.email, // Include the user's email
      name: watchlist.name,
      companies: watchlist.companies.map(company => company.symbol),
    };
  }

  /**
   * Get all watchlists for a user.
   * @param userId - The ID of the user.
   * @returns Array of transformed watchlists.
   */
  public async getAllWatchlists(
    userId: number): Promise<watchlistPreviewResponse> {
    const watchlists = await prisma.watchlist.findMany({
      where: { userId },
      include: {
        companies: true,
        user: true,
      },
    });

    const transformedWatchlists = watchlists.map(watchlist => ({
      id: watchlist.id,
      user: watchlist.user.email,
      name: watchlist.name,
      companies: watchlist.companies.map(company => company.symbol),
    }));

    return { watchLists: transformedWatchlists };
  }



  /**
   * Update a watchlist by its ID.
   * @param watchlistId - The ID of the watchlist.
   * @param name - The new name of the watchlist.
   * @param companies - Array of company symbols 
   * to be included in the watchlist.
   * @returns The updated watchlist.
   */
  public async updateWatchlist(
    watchlistId: number, 
    name: string, companies: string[]): Promise<Watchlist> {
    await prisma.watchlistCompany.deleteMany({
      where: { watchlistId },
    });

    const updatedWatchlist = await prisma.watchlist.update({
      where: { id: watchlistId },
      data: {
        name,
        companies: {
          create: companies.map(symbol => ({
            symbol,
          })),
        },
      },
      include: { companies: true },
    });

    return updatedWatchlist;
  }
}

export const watchlistService = new WatchlistService();
