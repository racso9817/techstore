from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Product, Category, ProductCategory
from .serializers import ProductSerializer, CategorySerializer, ProductCategorySerializer
import logging

# Create your views here.
logger = logging.getLogger(__name__)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('created_at')
    serializer_class = ProductSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('created_at')
    serializer_class = CategorySerializer

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all().order_by('created_at')
    serializer_class = ProductCategorySerializer

    @action(detail=False, methods=['get'], url_path='by-product/(?P<product_id>[^/.]+)')
    def by_product(self, request, product_id=None):
        product_categories = self.queryset.filter(product_id=product_id)
        serializer = self.get_serializer(product_categories, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        try:
            # Intenta realizar la operación de creación
            return super().create(request, *args, **kwargs)
        except Exception as e:
            # Captura cualquier excepción y registra el error
            logger.error(f"Error al crear la categoría de producto: {str(e)}")
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
