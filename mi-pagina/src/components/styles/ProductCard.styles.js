import styled from "styled-components";

// Contenedor principal de la tarjeta
export const CardContainer = styled.div`
  background: #ffffff;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid #e5e5e5;
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 6px 18px rgba(0,0,0,0.15);
  }
`;

// Imagen del producto
export const ProductImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: contain;
  border-radius: 6px;
`;

// Título del producto
export const ProductTitle = styled.h4`
  margin-top: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  text-align: center;

  &:hover {
    color: #0077ff;
  }
`;

// Contenedor precio + botón carrito
export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

// Botón agregar al carrito
export const AddButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #333;
    transform: scale(1.05);
  }
`;

// Contenedor de botones administrativos (editar / eliminar)
export const AdminButtons = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

// Botón editar
export const AdminButtonEdit = styled.button`
  background: #f0ad4e;
  color: white;
  border: none;
  padding: 6px;
  width: 50%;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #ec971f;
    transform: scale(1.05);
  }
`;

// Botón eliminar
export const AdminButtonDelete = styled.button`
  background: #d9534f;
  color: white;
  border: none;
  padding: 6px;
  width: 50%;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background: #c9302c;
    transform: scale(1.05);
  }
`;


