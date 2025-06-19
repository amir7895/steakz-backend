"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const sendNotification = async (customerId, message) => {
    try {
        console.log(`Notification sent to customer ${customerId}: ${message}`);
    }
    catch (error) {
        console.error('Failed to send notification:', error);
        throw new Error('Notification service error');
    }
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=notificationService.js.map