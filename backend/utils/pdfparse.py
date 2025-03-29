import PyPDF2

def pdfparse(file_path):
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            num_pages = len(reader.pages)
            
            text = ''
            for page_num in range(num_pages):
                page = reader.pages[page_num]
                text += page.extract_text() if page.extract_text() else ''

            metadata = reader.metadata

            print(f"Number of pages: {num_pages}")
            print(f"Metadata: {metadata}")
            print(f"Extracted text: {text[:500]}...")  # Print first 500 characters for preview

            return {
                'num_pages': num_pages,
                'metadata': metadata,
                'text': text
            }
    except Exception as e:
        print(f"Error while parsing PDF: {str(e)}")
        return None