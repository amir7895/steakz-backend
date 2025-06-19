export const sendNotification = async (customerId: number, message: string): Promise<void> => {
  try {
    // Simulate sending a notification (e.g., email, SMS)
    console.log(`Notification sent to customer ${customerId}: ${message}`);
  } catch (error) {
    console.error('Failed to send notification:', error);
    throw new Error('Notification service error');
  }
};
