export interface PaginatedResponseDTO<T> {
    data: T[];           // Array of AccommodationDTO
    currentPage: number; // Current page number
    itemsPerPage: number; // Number of items per page
    totalItems: number;  // Total number of items available
  }
  