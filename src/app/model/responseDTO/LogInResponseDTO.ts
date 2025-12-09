export interface LogInResponseDTO {
  emailAddress: string;
  accessToken: string;
  createdAt: string; // LocalDateTime → string in JSON
}
