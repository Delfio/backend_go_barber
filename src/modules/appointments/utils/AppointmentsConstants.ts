type IAppointmentCacheKeyRequest = {
    provider_id: string;
    year: string | number;
    month: string | number;
    day: string | number;
}

const appointmentsCacheKey = ({
  day,
  month,
  provider_id,
  year,
}: IAppointmentCacheKeyRequest): string => `providers-appointments:${provider_id}:${year}:${month}:${day}`;

export default appointmentsCacheKey;
