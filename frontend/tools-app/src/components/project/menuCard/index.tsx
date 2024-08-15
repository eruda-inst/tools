import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

  type CardProps = {
    link?: string;
    title: string;
    description?: string;
    content?: string;
    footer?: string;
    children?: React.ReactNode; // Adiciona children com tipo adequado
    className?: string;
  };
  
  export default function MenuCard({ title, description, content, footer, children, className, link }: CardProps) {
    return (
    <a href={link} className="min-w-48">
      <Card className={className}>
        <CardHeader>
          {children}
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
        <CardFooter>
          <p>{footer}</p>
        </CardFooter>
      </Card>
    </a>
    );
  }
  