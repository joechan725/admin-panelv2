import Link from 'next/link';

interface PolicyStatementProps {}

const PolicyStatement = ({}: PolicyStatementProps) => {
  return (
    <div className="text-xs font-medium text-tertiary-text mt-2">
      * By clicking the "Pay Now" button, you agree to our{' '}
      <Link
        className="underline-offset-1 underline text-link transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/privacy-policy"
      >
        Privacy Policy
      </Link>
      ,{' '}
      <Link
        className="underline-offset-1 underline text-link transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/terms-of-service"
      >
        Terms of Service
      </Link>
      , and{' '}
      <Link
        className="underline-offset-1 underline text-link transition-all hover:text-opacity-85 active:text-opacity-70"
        href="/return-and-exchange-policy"
      >
        Return and Exchange Policy
      </Link>
      .
    </div>
  );
};

export default PolicyStatement;
