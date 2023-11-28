import { paymentForm } from '@square/web-payments-sdk';

const applicationId = 'sandbox-sq0idb-_gtfm7huEf_xA9blXwNY4Q';
const locationId = 'L1AB724TRVQ7A';

const paymentForm = new paymentForm(applicationId, locationId);

paymentForm.build();
paymentForm.mount('#square-payment-form');

// export default paymentForm;