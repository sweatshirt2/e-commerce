import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ZoomIn, ZoomOut } from "lucide-react";
import CartForm from "./CartForm";
import { cn } from "@/lib/utils";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrl?: string;
  name: string;
  price: number;
  description?: string;
}

export default function ProductModal({
  open,
  onOpenChange,
  imageUrl,
  name,
  price,
  description,
}: ProductModalProps) {
  const [zoom, setZoom] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);

  function handleZoomIn() {
    setZoom((z) => Math.min(z + 0.25, 2.5));
  }
  function handleZoomOut() {
    setZoom((z) => Math.max(z - 0.25, 1));
  }

  const handleMoveLeft = () => {
    if (imageRef.current && containerRef.current) {
      const imageWidth = imageRef.current.offsetWidth * zoom;
      if (positionX < 0) {
        setPositionX((prevX) => Math.min(0, prevX + 50));
      }
    }
  };

  const handleMoveRight = () => {
    if (imageRef.current && containerRef.current) {
      const imageWidth = imageRef.current.offsetWidth * zoom;
      const containerWidth = containerRef.current.offsetWidth;
      if (imageWidth + positionX > containerWidth) {
        setPositionX((prevX) => prevX - 50);
      }
    }
  };

  const handleMoveUp = () => {
    if (imageRef.current && containerRef.current) {
      if (positionY < 0) {
        setPositionY((prevY) => Math.min(0, prevY + 50));
      }
    }
  };

  const handleMoveDown = () => {
    if (imageRef.current && containerRef.current) {
      const imageHeight = imageRef.current.offsetHeight * zoom;
      const containerHeight = containerRef.current.offsetHeight;
      if (imageHeight + positionY > containerHeight) {
        setPositionY((prevY) => prevY - 50);
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (zoom > 1) {
      isDragging.current = true;
      startX.current = e.clientX - positionX;
      startY.current = e.clientY - positionY;
      imageRef.current?.classList.add("cursor-grabbing");
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    setPositionX(e.clientX - startX.current);
    setPositionY(e.clientY - startY.current);

    if (imageRef.current && containerRef.current) {
      const imageWidth = imageRef.current.offsetWidth * zoom;
      const imageHeight = imageRef.current.offsetHeight * zoom;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      setPositionX((prevX) =>
        Math.max(containerWidth - imageWidth, Math.min(0, prevX))
      );
      setPositionY((prevY) =>
        Math.max(containerHeight - imageHeight, Math.min(0, prevY))
      );
    }
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      isDragging.current = false;
      imageRef.current?.classList.remove("cursor-grabbing");
    }
  };

  const handleMouseLeave = () => {
    if (isDragging.current) {
      isDragging.current = false;
      imageRef.current?.classList.remove("cursor-grabbing");
    }
  };

  const isLeftBoundary = () => positionX >= 0;
  const isRightBoundary = () => {
    if (imageRef.current && containerRef.current) {
      return (
        imageRef.current.offsetWidth * zoom + positionX <=
        containerRef.current.offsetWidth
      );
    }
    return true;
  };
  const isTopBoundary = () => positionY >= 0;
  const isBottomBoundary = () => {
    if (imageRef.current && containerRef.current) {
      return (
        imageRef.current.offsetHeight * zoom + positionY <=
        containerRef.current.offsetHeight
      );
    }
    return true;
  };

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const num = Number(value);
    setQuantity(num);
    if (!value || isNaN(num) || num <= 0 || !Number.isInteger(num)) {
      setQuantityError(
        "Please enter a valid quantity (whole number greater than 0)."
      );
    } else {
      setQuantityError(null);
    }
  }

  function handleAddToCart() {
    if (quantityError || quantity < 1) {
      setQuantityError("Please enter a valid quantity before adding.");
      return;
    }

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogContent className="sm:max-w-[625px]"> */}
      <DialogContent
        className={cn(
          "sm:max-w-[625px]",
          "data-[state=open]:animate-in-warp",
          "data-[state=closed]:animate-out-warp",
          "data-[state=closed]:fade-out-0",
          "data-[state=open]:fade-in-0"
        )}
      >
        <DialogTitle>Add To Cart</DialogTitle>
        <div className="flex justify-between items-start p-6 gap-5">
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div
              className="rounded-xl overflow-hidden shadow border flex items-center justify-center aspect-square mb-3 bg-white"
              style={{
                width: 250,
                height: 250,
              }}
            >
              <div
                className="relative rounded-2xl overflow-hidden aspect-[1/1]"
                ref={containerRef}
              >
                <img
                  ref={imageRef}
                  src={imageUrl ?? ""}
                  alt={name}
                  style={{
                    transform: `scale(${zoom}) translate(${positionX}px, ${positionY}px)`,
                    transition: "transform 0.2s ease",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    cursor: zoom > 1 ? "grab" : "default",
                    userSelect: "none",
                  }}
                  draggable={false}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Zoom Out"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outline"
                aria-label="Zoom In"
                onClick={handleZoomIn}
                disabled={zoom >= 2.5}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-start py-2">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-600">{`$ ${price}`}</p>
            <p className="text-sm font-light text-black">{description}</p>
            <CartForm />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
